import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class UserPublicDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    name: string;
}
