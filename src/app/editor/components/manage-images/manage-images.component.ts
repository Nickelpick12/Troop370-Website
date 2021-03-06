import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { v1 as uuid } from 'uuid';

@Component({
  selector: 'app-manage-images',
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.css']
})
export class ManageImagesComponent implements OnInit {
  @Input() imageObservable: BehaviorSubject<any>;
  imgs: any[] = [];
  browsing: boolean = false;
  selectedUrl: string = "";
  uploading: boolean = false;
  uploadValue: number = 0;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    var imageLibraryRef = this.storage.ref("image-library");
    imageLibraryRef.listAll().toPromise().then(images => {
      images.items.forEach(image => {
        image.getDownloadURL().then(url => {
          // console.log(url);
          this.imgs.push({
            url: url,
            imgRef: image
          });
        });
      });
    });

    this.imageObservable.subscribe(obj => {
      this.browsing = !obj.finished;
      this.selectedUrl = obj.url;
    })
  }

  uploadFile(event) {
    // console.log(event);

    const file = event.target.files[0];
    var filePath = `image-library/${uuid()}`;

    const fileRef = this.storage.ref(filePath);
    var task = fileRef.put(file);

    this.uploadValue = 0;
    task.percentageChanges().subscribe(value => {
      this.uploadValue = value;
      this.uploading = true;
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        var downloadURL = fileRef.getDownloadURL();
        downloadURL.subscribe(val => {
          this.imgs.push({
            url: val,
            imgRef: fileRef
          });
          // this.urls.push(val);
        });
      })
   )
  .subscribe()
  }

  deleteImg(imgRef: any) {
    // console.log(imgRef)
    imgRef.delete().toPromise().then(() => {
      for(var i = 0; i < this.imgs.length; i++) {
        if(this.imgs[i].imgRef == imgRef) {
          this.imgs.splice(i, 1);
        }
      }
    })
  }

  selectUrl(url: string) {
    // console.log(url)
    this.selectedUrl = url;
  }

  submit() {
    this.imageObservable.next({
      finished: true,
      url: this.selectedUrl
    });
  }


  // HTML Functions
  calculateBorder(url: string) {
    if(url == this.selectedUrl) {
      return "rgb(0, 191, 255)";
    } else {
      return "white";
    }
  }

  src(url: string) {
    return `url(${url})`;
  }

}

