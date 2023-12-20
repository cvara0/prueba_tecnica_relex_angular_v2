import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post.models';

@Pipe({
  name: 'searchByKeyword',
  standalone: true
})
export class SearchByKeywordPipe implements PipeTransform {

  transform(postList: Post[], keywordToSearch:string=''): Post[] {
   
    return postList.filter(post =>
      post.id?.toString().includes(keywordToSearch) ||
      post.userId?.toString().includes(keywordToSearch) ||
      post.title.toLowerCase().includes(keywordToSearch) ||
      post.body.toLowerCase().includes(keywordToSearch)
    );
  }

}
