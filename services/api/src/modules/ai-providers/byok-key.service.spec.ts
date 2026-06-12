import { BadRequestException } from '@nestjs/common';

import { ByokKeyService } from './byok-key.service';

describe('ByokKeyService', () => {
  it('stores provider keys encrypted and returns only masked metadata', () => {
    const service = new ByokKeyService();
    const apiKey = 'sk-ant-test-secret-1234';

    const saved = service.save({
      userId: 'user-1',
      provider: 'anthropic',
      apiKey,
      defaultModel: 'claude-sonnet',
      isDefault: true,
    });

    expect(saved).toMatchObject({
      provider: 'anthropic',
      keySuffix: '1234',
      defaultModel: 'claude-sonnet',
      isDefault: true,
      status: 'connected',
    });
    expect(JSON.stringify(saved)).not.toContain(apiKey);
    expect(JSON.stringify(service.list('user-1'))).not.toContain(apiKey);
  });

  it('decrypts only through provider resolution for owned keys', () => {
    const service = new ByokKeyService();
    const apiKey = 'sk-ant-owned-secret-9876';

    service.save({
      userId: 'user-1',
      provider: 'anthropic',
      apiKey,
      defaultModel: 'claude-sonnet',
    });

    const resolved = service.resolveDefault('user-1');
    expect(resolved.apiKey).toBe(apiKey);
    expect(resolved.defaultModel).toBe('claude-sonnet');
  });

  it('does not resolve invalid keys for AI calls', () => {
    const service = new ByokKeyService();

    service.save({
      userId: 'user-1',
      provider: 'anthropic',
      apiKey: 'invalid-key-1234',
      defaultModel: 'claude-sonnet',
    });

    expect(() => service.resolveDefault('user-1')).toThrow(BadRequestException);
  });
});
