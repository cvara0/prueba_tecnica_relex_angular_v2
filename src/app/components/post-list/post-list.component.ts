import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.models';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { SearchByKeywordPipe } from '../../pipes/search-by-keyword.pipe';
import { SearchByTitlePipe } from '../../pipes/search-by-title.pipe';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [NgxPaginationModule,FormsModule, ReactiveFormsModule,CommonModule,SearchByKeywordPipe,SearchByTitlePipe],
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  
  p               :number = 1;
  postList        :Post[] = []; 
  page            :number=0;
  titleToSearch   :string='';
  keywordToSearch :string='';
  postToEdit!     :Post;
  
  titleLength:number=0;
  bodyLength:number=0;

  editPostFormGroup! :FormGroup;

  constructor(private postService:PostService,private formBuilder:FormBuilder){
   
  }


  async ngOnInit():Promise<void> {
    
    this.postService.getPostList().subscribe((postList:any)=>{
      postList.map((auxPost:Post)=>{
          let post={
            userId: auxPost.userId,
            id    : auxPost.id,
            title : auxPost.title,
            body  : auxPost.body
          }
          this.postList.push(post);
      })
    });
    //console.log(this.postList);
  }
//
  refreshLength(){
    this.titleLength=this.editPostFormGroup.get('postToEditTitle')?.value?.length ?? 0;
    this.bodyLength=this.editPostFormGroup.get('postToEditBody')?.value?.length ?? 0;
  }
//
  searchByKeyword(keywordToSearch:string){
    this.keywordToSearch=keywordToSearch;
  }

  searchByTitle(titleToSearch:string){
    this.titleToSearch=titleToSearch;
  }
//
  deletePost(postToDelete:Post){
      if (window.confirm("'Eliminar' post "+postToDelete.title+" ?"))
        this.postService.deletePost(postToDelete.id); 
  }
  createEditPostFormGroup(post:Post){
    this.postToEdit=post;
    this.titleLength=post.title.length;
    this.bodyLength=post.body.length;
    this.editPostFormGroup=this.formBuilder.group({
      postToEditTitle   : [this.postToEdit.title,[Validators.required,Validators.maxLength(80),Validators.pattern(/[\S]/)]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      postToEditBody    : [this.postToEdit.body,[Validators.required,Validators.maxLength(500),Validators.pattern(/[\S]/)]]
    });
  }

  get invalidPostToEditTitle(){
    return this.editPostFormGroup.get('postToEditTitle')?.invalid;
  }

  get invalidPostToEditBody(){
    return this.editPostFormGroup.get('postToEditBody')?.invalid;
  }


  saveEditPost(){
    let post:Post=new Post(
      this.postToEdit.userId,
      this.postToEdit.id,
      this.editPostFormGroup.get('postToEditTitle')?.value,
      this.editPostFormGroup.get('postToEditBody')?.value
    );

    this.postService.updatePost(post);
 
  }
}
