import { IsBoolean } from 'class-validator';

export class UpdatePortfolioItemDto {
  @IsBoolean()
  isPublic!: boolean;
}
