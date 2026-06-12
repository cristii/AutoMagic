import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  randomUUID,
} from 'node:crypto';

export type AiProviderName = 'anthropic' | 'openai' | 'deepseek';
export type ProviderKeyStatus = 'connected' | 'invalid';

export type MaskedProviderKey = {
  id: string;
  provider: AiProviderName;
  keySuffix: string;
  defaultModel: string;
  isDefault: boolean;
  status: ProviderKeyStatus;
  createdAt: string;
};

export type SaveProviderKeyInput = {
  userId: string;
  provider: AiProviderName;
  apiKey: string;
  defaultModel: string;
  isDefault?: boolean;
};

export type ResolvedProviderKey = {
  id: string;
  provider: AiProviderName;
  apiKey: string;
  defaultModel: string;
};

type StoredProviderKey = MaskedProviderKey & {
  userId: string;
  encryptedKey: string;
};

@Injectable()
export class ByokKeyService {
  private readonly records: StoredProviderKey[] = [];
  private readonly encryptionKey = createHash('sha256')
    .update(process.env.SANDBOX_BYOK_SECRET ?? 'dev-only-sandbox-byok-secret')
    .digest();

  list(userId: string): MaskedProviderKey[] {
    return this.records.filter((record) => record.userId === userId).map(this.toMaskedKey);
  }

  save(input: SaveProviderKeyInput): MaskedProviderKey {
    const trimmedKey = input.apiKey.trim();
    if (trimmedKey.length < 8) {
      throw new BadRequestException('Provider key is too short to validate.');
    }

    const status = this.validateKeyShape(input.provider, trimmedKey);
    if (input.isDefault) {
      for (const record of this.records) {
        if (record.userId === input.userId) record.isDefault = false;
      }
    }

    const saved: StoredProviderKey = {
      id: randomUUID(),
      userId: input.userId,
      provider: input.provider,
      encryptedKey: this.encrypt(trimmedKey),
      keySuffix: trimmedKey.slice(-4),
      defaultModel: input.defaultModel,
      isDefault: input.isDefault ?? this.records.every((record) => record.userId !== input.userId),
      status,
      createdAt: new Date().toISOString(),
    };

    this.records.push(saved);
    return this.toMaskedKey(saved);
  }

  update(
    userId: string,
    keyId: string,
    input: { defaultModel?: string; isDefault?: boolean; apiKey?: string },
  ): MaskedProviderKey {
    const record = this.findOwnedRecord(userId, keyId);

    if (input.defaultModel) record.defaultModel = input.defaultModel;
    if (input.apiKey) {
      const trimmedKey = input.apiKey.trim();
      record.encryptedKey = this.encrypt(trimmedKey);
      record.keySuffix = trimmedKey.slice(-4);
      record.status = this.validateKeyShape(record.provider, trimmedKey);
    }

    if (input.isDefault) {
      for (const existing of this.records) {
        if (existing.userId === userId) existing.isDefault = false;
      }
      record.isDefault = true;
    }

    return this.toMaskedKey(record);
  }

  delete(userId: string, keyId: string): void {
    const index = this.records.findIndex((record) => record.userId === userId && record.id === keyId);
    if (index < 0) throw new NotFoundException('Provider key not found.');
    this.records.splice(index, 1);
  }

  resolveDefault(userId: string, provider?: AiProviderName): ResolvedProviderKey {
    const record =
      this.records.find(
        (candidate) =>
          candidate.userId === userId &&
          candidate.status === 'connected' &&
          (provider ? candidate.provider === provider : candidate.isDefault),
      ) ??
      this.records.find(
        (candidate) => candidate.userId === userId && candidate.status === 'connected',
      );

    if (!record) {
      throw new BadRequestException('Connect a valid BYOK provider key before using AI features.');
    }

    return {
      id: record.id,
      provider: record.provider,
      apiKey: this.decrypt(record.encryptedKey),
      defaultModel: record.defaultModel,
    };
  }

  private findOwnedRecord(userId: string, keyId: string): StoredProviderKey {
    const record = this.records.find((candidate) => candidate.userId === userId && candidate.id === keyId);
    if (!record) throw new NotFoundException('Provider key not found.');
    return record;
  }

  private validateKeyShape(provider: AiProviderName, apiKey: string): ProviderKeyStatus {
    if (provider === 'anthropic') return apiKey.startsWith('sk-ant-') ? 'connected' : 'invalid';
    if (provider === 'openai') return apiKey.startsWith('sk-') ? 'connected' : 'invalid';
    return apiKey.length >= 12 ? 'connected' : 'invalid';
  }

  private encrypt(value: string): string {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', this.encryptionKey, iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString('base64')}.${tag.toString('base64')}.${encrypted.toString('base64')}`;
  }

  private decrypt(payload: string): string {
    const [ivBase64, tagBase64, encryptedBase64] = payload.split('.');
    if (!ivBase64 || !tagBase64 || !encryptedBase64) {
      throw new BadRequestException('Stored provider key is malformed.');
    }

    const decipher = createDecipheriv(
      'aes-256-gcm',
      this.encryptionKey,
      Buffer.from(ivBase64, 'base64'),
    );
    decipher.setAuthTag(Buffer.from(tagBase64, 'base64'));
    return Buffer.concat([
      decipher.update(Buffer.from(encryptedBase64, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  }

  private toMaskedKey(record: StoredProviderKey): MaskedProviderKey {
    return {
      id: record.id,
      provider: record.provider,
      keySuffix: record.keySuffix,
      defaultModel: record.defaultModel,
      isDefault: record.isDefault,
      status: record.status,
      createdAt: record.createdAt,
    };
  }
}
