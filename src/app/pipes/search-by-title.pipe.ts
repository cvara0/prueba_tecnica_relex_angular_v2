import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post.models';

@Pipe({
  name: 'searchByTitle',
  standalone: true
})
export class SearchByTitlePipe implements PipeTransform {

  transform(postList: Post[], titleTosearch:string=''): Post[] {

    const filteredPostList=postList.filter(i=>
      {
          return i.title?i.title.includes(titleTosearch):"";
      });

    return filteredPostList;
  }

}
