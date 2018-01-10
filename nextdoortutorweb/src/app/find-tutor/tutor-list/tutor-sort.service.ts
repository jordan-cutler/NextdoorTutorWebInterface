import { Tutor } from '../../shared/tutor/tutor-model/tutor.model';
import { Grade } from '../../shared/tutor/tutor-model/grade.model';

export class TutorSortService {
  private currentlySortingBy = 'hourlyRate';
  private ascendingOrDescending = 'ascending';

  constructor() {
  }

  private static getGradeSort(a: Tutor, b: Tutor): number {
    return Grade.getRank(new Grade(a.grade)) - Grade.getRank(new Grade(b.grade));
  }

  private static getHourlyRateSort(a: Tutor, b: Tutor): number {
    return a.hourlyRate - b.hourlyRate;
  }

  private static sortByHourlyRateAscending(tutors: Tutor[]) {
    tutors.sort((a: Tutor, b: Tutor) => {
      const rateSort = TutorSortService.getHourlyRateSort(a, b);
      if (rateSort === 0) {
        return TutorSortService.getGradeSort(a, b);
      }
      return rateSort;
    });
  }

  private static sortByHourlyRateDescending(tutors: Tutor[]) {
    tutors.sort((a: Tutor, b: Tutor) => {
      const rateSort = TutorSortService.getHourlyRateSort(b, a);
      if (rateSort === 0) {
        return TutorSortService.getGradeSort(a, b);
      }
      return rateSort;
    });
  }

  private static sortByGradeAscending(tutors: Tutor[]) {
    tutors.sort((a: Tutor, b: Tutor) => {
      const gradeSort = TutorSortService.getGradeSort(b, a);
      if (gradeSort === 0) {
        return TutorSortService.getHourlyRateSort(a, b);
      }
      return gradeSort;
    });
  }

  private static sortByGradeDescending(tutors: Tutor[]) {
    tutors.sort((a: Tutor, b: Tutor) => {
      const gradeSort = TutorSortService.getGradeSort(a, b);
      if (gradeSort === 0) {
        return TutorSortService.getHourlyRateSort(a, b);
      }
      return gradeSort;
    });
  }

  sortAscending(tutors: Tutor[]) {
    this.ascendingOrDescending = 'ascending';
    this.sortByCurrent(tutors);
  }

  sortDescending(tutors: Tutor[]) {
    this.ascendingOrDescending = 'descending';
    this.sortByCurrent(tutors);
  }

  sortByHourlyRate(tutors: Tutor[]) {
    this.currentlySortingBy = 'hourlyRate';
    this.sortByCurrent(tutors);
  }

  sortByGrade(tutors: Tutor[]) {
    this.currentlySortingBy = 'grade';
    this.sortByCurrent(tutors);
  }

  sortByCurrent(tutors: Tutor[]) {
    if (this.ascendingOrDescending === 'ascending') {
      if (this.currentlySortingBy === 'hourlyRate') {
        TutorSortService.sortByHourlyRateAscending(tutors);
      } else if (this.currentlySortingBy === 'grade') {
        TutorSortService.sortByGradeAscending(tutors);
      }
    } else if (this.ascendingOrDescending === 'descending') {
      if (this.currentlySortingBy === 'hourlyRate') {
        TutorSortService.sortByHourlyRateDescending(tutors);
      } else if (this.currentlySortingBy === 'grade') {
        TutorSortService.sortByGradeDescending(tutors);
      }
    }
  }


}
