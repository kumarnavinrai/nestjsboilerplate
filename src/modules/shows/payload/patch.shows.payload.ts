import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
  Matches,
} from "class-validator";

/**
 * Patch Shows Payload Class
 */
export class PatchShowsPayload {
  /**
   * Name field
   */
  @ApiProperty()
  //@IsEmail()
  @IsNotEmpty()
  name: string;

  /**
   * Image field
   */
  @ApiProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  image: string;

  /**
   * Type field
   */
  @ApiProperty()
  @IsNotEmpty()
  type: string;

}
