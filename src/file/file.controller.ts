import {
  Body,
  Controller,
  FileTypeValidator, MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileService } from './file.service';
import { CreateFileDto } from "./dto/create-file.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CustomFileInterceptor } from "../interceptors/custom-file.interceptor";

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'), new CustomFileInterceptor('image'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'jpeg|jpg|png' }),
          new MaxFileSizeValidator({ maxSize: 2048*1024 })
        ]
      })
    ) file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto
  ) {
    return this.fileService.create(file, createFileDto);
  }
}