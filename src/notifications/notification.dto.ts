import { IsNotEmpty, IsString, IsUrl, isDateString } from "class-validator";

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsUrl({}, { message: "url must be a valid URL" })
  url: string;

  @IsString()
  @IsNotEmpty()
  navigation_id: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}
