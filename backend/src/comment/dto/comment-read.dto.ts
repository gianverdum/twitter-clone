import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { UserPublicDto } from "src/user/dto/user-public.dto";


export class CommentReadDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    updatedAt: Date;

    @ApiProperty()
    @Expose()
    comment: string;

    @ApiProperty({ type: UserPublicDto })
    @Expose()
    @Type(() => UserPublicDto)
    author: UserPublicDto;

    @ApiProperty({ type: CommentReadDto, required: false })
    @Expose()
    @Type(() => CommentReadDto)
    parent?: CommentReadDto;

    @ApiProperty({ type: [CommentReadDto], required: false })
    @Expose()
    @Type(() => CommentReadDto)
    replies?: CommentReadDto[];
}
