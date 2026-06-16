import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    MessagesModule
  ],
  exports: [
    FileUploadModule,
    ToastModule,
    ButtonModule,
    MessagesModule
  ],  
  providers: [
    MessageService
  ]
  
})
export class CustomPrimeNgModule { }
