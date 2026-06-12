import { Injectable } from '@nestjs/common';

export type SchemaParser<T> = (value: unknown) => T;
export type RepairFunction = (failedOutput: string) => Promise<string>;

@Injectable()
export class JsonOutputService {
  async parseWithRepair<T>(
    rawOutput: string,
    parser: SchemaParser<T>,
    repair: RepairFunction,
  ): Promise<T> {
    const first = this.tryParse(rawOutput, parser);
    if (first.ok) return first.value;

    const repairedOutput = await repair(rawOutput);
    const second = this.tryParse(repairedOutput, parser);
    if (second.ok) return second.value;

    throw new Error('AI output failed schema validation after repair.');
  }

  private tryParse<T>(
    rawOutput: string,
    parser: SchemaParser<T>,
  ): { ok: true; value: T } | { ok: false; error: Error } {
    try {
      return { ok: true, value: parser(JSON.parse(rawOutput) as unknown) };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error : new Error('Unknown JSON parse error.'),
      };
    }
  }
}
