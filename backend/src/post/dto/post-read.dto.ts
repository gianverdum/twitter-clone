import { ApiProperty } from "@nestjs/swagger"
import { Expose, Type } from "class-transformer";
import { CommentReadDto } from "src/comment/dto/comment-read.dto";
import { UserPublicDto } from "src/user/dto/user-public.dto";


export class PostReadDto {
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
    title: string;

    @ApiProperty()
    @Expose()
    content: string;

    @ApiProperty({ type: UserPublicDto })
    @Expose()
    @Type(() => UserPublicDto)
    author: UserPublicDto;

    @ApiProperty({ type: [CommentReadDto] })
    @Expose()
    @Type(() => CommentReadDto)
    comments: CommentReadDto[];
}
