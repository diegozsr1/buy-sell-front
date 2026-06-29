import { Component, signal } from '@angular/core';
import { PhotoUploaderEvent as PUEvent } from './photo-uploader.config';
import { Icon } from "../../atoms/icon/icon";
import { Button } from "../../atoms/button/button";

@Component({
  selector: 'organism-photo-uploader',
  imports: [Icon, Button],
  templateUrl: './photo-uploader.html',
  styleUrl: './photo-uploader.css',
})
export class PhotoUploader {
  protected dragEvent = signal<PUEvent>(PUEvent.DRAG);
  protected photos = signal<string[]>(["", "", "", ""]);
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragEvent.set(PUEvent.DRAG_OVER)
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragEvent.set(PUEvent.DRAG_LEAVE);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      console.log(Array.from(files));
    }
  }

  protected previewCaption = signal<string | null>(null);

  protected uploadPhotos(event:Event) {
    const input = event.target as HTMLInputElement;
    const updfiles = Array.from(input.files ?? []);
    
    for(let i=0; i< this.photos().length; i++ ){
      if(!this.photos()[i]){
        // Creamos una url para la imagen
        const url = URL.createObjectURL(updfiles[i]);
        this.photos.update((current) =>[] );
      }  
    }
  }
}
