import { IsString, isDateString } from "class-validator";

export class CreateNotificationDto {
  @IsString()
  title: string;
  body: string;
  url: string;
  naviagation_id: string;
}
