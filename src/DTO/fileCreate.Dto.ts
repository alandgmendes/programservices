import { ApiProperty } from '@nestjs/swagger';

export class FileCreateDto {
  @ApiProperty()
  readonly base64: string;
}
