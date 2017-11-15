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
            minTime:"7:00:00",
            maxTime:"22:00:00",
            slotDuration: '00:30:00',
            aspectRatio: 2,
            height:"auto",
            scrollTime:'10:00:00',
            timeFormat: '',
            allDaySlot:false,
            eventLimit: true,
            columnFormat: 'dddd',
            events: [
                {
                    title: 'Available',
                    start: '16:00:00',
                    end: '18:00:00',
                    dow: [0, 3, 5]
                },
                {
                    title: 'Available',
                    start: '10:30:00',
                    end: '12:30:00',
                    dow: [1, 2, 6]
                },
                {
                    title: 'Available',
                    start: '07:00:00',
                    end: '09:00:00',
                    dow: [4]
                }
            ]
        });
    }
}