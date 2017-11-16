let moment: any;
class Calendar {
    private static readonly NAME = "Calendar";
    private static readonly DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    private static readonly CalendarCardContentSelector = "#" + Calendar.NAME + "-calendar";



    public static init() {
        $("#indexMain").html(Handlebars.templates[Calendar.NAME + ".hb"]({}));
        $(Calendar.CalendarCardContentSelector).fullCalendar({
            header: false,
            defaultView: 'agendaWeek',
            editable: true,
            minTime: moment.duration("7:00:00"),
            maxTime: moment.duration("22:00:00"),
            slotDuration: moment.duration('00:30:00'),
            aspectRatio: 2,
            height:"auto",
            scrollTime:moment.duration('10:00:00'),
            timeFormat: '',
            allDaySlot:false,
            eventLimit: true,
            columnFormat: 'dddd',
            events: [
                {
                    title: 'Available',
                    start: moment.duration('16:00:00'),
                    end: moment.duration('18:00:00'),
                    dow: [0, 3, 5]
                },
                {
                    title: 'Available',
                    start: moment.duration('11:00:00'),
                    end: moment.duration('12:30:00'),
                    dow: [1, 2, 6]
                },
                {
                    title: 'Available',
                    start: moment.duration('08:00:00'),
                    end: moment.duration('09:00:00'),
                    dow: [4]
                }
            ]
        });
    }
}