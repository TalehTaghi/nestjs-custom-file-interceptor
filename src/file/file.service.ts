import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";
import { Repository } from "typeorm";
import { CreateFileDto } from "./dto/create-file.dto";
import { extname, parse } from "path";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import slugify from "../../helpers/file-helper";

@Injectable()
export class FileService {
  constructor(@InjectRepository(File) private readonly filesRepository: Repository<File>) {}

  async create(file: Express.Multer.File, createFileDto: CreateFileDto) {
    const base = slugify(parse(file.originalname).name);
    const extension = extname(file.originalname);

    const data = {
      title: createFileDto.title,
      filename: base + '-' + randomStringGenerator() + extension
    } as File;
    const fileData = this.filesRepository.create(data);

    return await this.filesRepository.save(fileData)
  }
}
