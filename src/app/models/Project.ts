export class Project {
  name: string;
  description: string;
  content: string;
  imageUrl: string;


  constructor(name: string, description: string, content: string, imageUrl: string) {
    this.name = name;
    this.description = description;
    this.content = content;
    this.imageUrl = imageUrl;
  }
}
