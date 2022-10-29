import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import * as fs from "fs";

@Injectable()
export class CustomFileInterceptor implements NestInterceptor {
  constructor(private readonly objectType: string) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const file = context.switchToHttp().getRequest().file;

    return next.handle().pipe(
      map(data => {
        try {
          const folderName = `storage/${this.objectType}/${data.id}/`;
          if (!fs.existsSync(folderName)) fs.mkdirSync(folderName, { recursive: true });
          fs.writeFileSync(folderName + data.filename, file.buffer);
        } catch (err) {
          console.log(err);
        }

        return { data }
      })
    );
  }
}