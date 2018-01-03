import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../shared/course/course.model';

@Component({
  selector: 'app-find-tutor-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  @Output() selectedCourseNumberEventEmitter = new EventEmitter<string>();
  @Input() courses: Course[];
  searchBarId: string;
  searchBarText = '';

  constructor() { }

  ngOnInit() {
    this.searchBarId = 'searchBar';
  }

  ngAfterViewInit() {
    this.initializeSearchBar();
  }

  initializeSearchBar() {
    const searchObject = { }; // will contain the info we pass to autocomplete so we can populate the search bar
    this.courses.forEach((course: Course) => {
      searchObject[course.courseNumber + ' ' + course.title] = null;
    });

    $('#' + this.searchBarId).autocomplete({
      data: searchObject,
      limit: 15, // The max amount of results that can be shown at once. Default: Infinity.
      // execute when someone clicks a selection
      onAutocomplete: (course: string) => {
        const courseNumber = course.split(' ')[0];
        this.searchBarText = course;
        this.selectedCourseNumberEventEmitter.emit(courseNumber);
        // CoursesWithTutors.showListOfTutorsForCourseNumber(courseNumber);
      },
      minLength: 0, // The minimum length of the input for the autocomplete to start. Default: 1.
    });
  }

  onSearchBarClick() {
    this.searchBarText = '';
    Materialize.updateTextFields();
  }

}