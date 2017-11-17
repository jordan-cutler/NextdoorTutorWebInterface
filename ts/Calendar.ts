let moment: any;

class Calendar {
    private static readonly NAME = "Calendar";
    private static readonly CalendarSelector = "#" + Calendar.NAME + "-calendar";
    private static readonly DismissIconSelector = "." + Calendar.NAME + "-dismissIcon";

    private static maxId: number = -1;

    public static init() {
        $("#indexMain").html(Handlebars.templates[Calendar.NAME + ".hb"]({}));
        $(Calendar.CalendarSelector).fullCalendar({
            header: false,
            defaultView: 'agendaWeek',
            editable: true,
            minTime: moment.duration("7:00:00"),
            maxTime: moment.duration("22:00:00"),
            slotDuration: moment.duration('00:30:00'),
            aspectRatio: 2,
            height: "auto",
            scrollTime: moment.duration('10:00:00'),
            timeFormat: '',
            allDaySlot: false,
            eventLimit: true,
            columnFormat: 'dddd',
            events: [],
            eventRender: function (event, element) {
                element.append(
                    '<i class="fa fa-times ' + Calendar.DismissIconSelector.substr(1) +
                    '" data-event_id=' + event.id + ' aria-hidden="true"></i>'
                );
                element.click(function (clickEvent) {
                    if ($(clickEvent.target).is(Calendar.DismissIconSelector)) {
                        let id = $(clickEvent.target).data('event_id');
                        $(Calendar.CalendarSelector).fullCalendar('removeEvents', [id]);
                    }
                });
            },
            dayClick: function (date: any, jsEvent) {
                let eventObject = {
                    id: Calendar.generateNewUniqueId(),
                    title: 'Available',
                    start: date.format()
                };
                $(Calendar.CalendarSelector).fullCalendar('renderEvent', eventObject, true);

            }
        });
    }

    private static generateNewUniqueId() {
        if (Calendar.maxId != -1) {
            let newMaxId = Calendar.maxId + 1;
            Calendar.maxId = newMaxId;
            return newMaxId;
        }
        let eventArray = $(Calendar.CalendarSelector).fullCalendar('clientEvents');
        let highest = -1;
        $.each(eventArray, function (index, event) {
            if (event.id > highest) highest = event.id;
        });
        let newMaxId = highest + 1;
        Calendar.maxId = newMaxId;
        return newMaxId;
    }
}