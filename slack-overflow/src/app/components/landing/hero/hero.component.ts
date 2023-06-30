import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  questionContentImg!: string;
  questionItemIsSelected!: boolean;
  questionsImg: string[] = [
    'https://cdn.sstatic.net/Img/home/illo-feats-ask.svg?v=b6cd07f0765a',
    'https://cdn.sstatic.net/Img/home/illo-feats-vote.svg?v=9d2eb0efdc17',
    'https://cdn.sstatic.net/Img/home/illo-feats-answer.svg?v=b637b99bc32a',
    'https://cdn.sstatic.net/Img/home/illo-feats-tags.svg?v=0655cbe6bffa',
    'https://cdn.sstatic.net/Img/home/illo-feats-accept.svg?v=f2be4b8dfdac',
    'https://cdn.sstatic.net/Img/home/illo-feats-recognize.svg?v=4f011d7173e8',
  ];
  index = 0;

  selectItem(id: number): void {
    this.questionItemIsSelected = true;
    this.resetActive();
    this.changeImage(id);
  }

  resetActive(): void {
    const questionItems = document.querySelectorAll('.questions-body-item');
    questionItems?.forEach((item: Element) => {
      item.classList.remove('active');
    });
  }

  changeImage(id: number): void {
    this.questionContentImg = this.questionsImg[id];
  }

  firstSlider(): void {
    this.changeImage(this.index);
    const questionItems = document.querySelectorAll('.questions-body-item');
    questionItems[this.index].classList.add('active');
    this.index++;
  }

  durationSlider(): void {
    setInterval(() => {
      if (!this.questionItemIsSelected) {
        this.changeImage(this.index);
        this.resetActive();
        const questionItems = document.querySelectorAll('.questions-body-item');
        questionItems[this.index]?.classList.add('active');
        this.index =
          this.index < this.questionsImg.length - 1 ? this.index + 1 : 0;
      }
    }, 3000);
  }

  ngOnInit(): void {
    this.firstSlider();
    this.durationSlider();
  }
}
