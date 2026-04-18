export class Project {
  key: string;
  name: string;
  description: string;
  content: string;
  imageUrl: string;


  constructor(key: string, name: string, description: string, content: string, imageUrl: string) {
    this.key = key;
    this.name = name;
    this.description = description;
    this.content = content;
    this.imageUrl = imageUrl;
  }
}
