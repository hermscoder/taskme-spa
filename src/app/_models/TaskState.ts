export class TaskState {
    public static CREATED = new TaskState('CR', 'Created');
    public static APPLICATIONS_OPEN = new TaskState('AO', 'Applications Open');
    public static APPLICATIONS_CLOSED = new TaskState('AC', 'Applications Closed');
    public static STARTED = new TaskState('ST', 'Started');
    public static DONE = new TaskState('DO', 'Done');
    public static CANCELLED = new TaskState('CN', 'Cancelled');

    private static VALUES: TaskState[] = [];

    private code: string;
    private description: string;

    public value(): string {
        return this.value();
    }

    private constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
        TaskState.VALUES.push(this);
    }
}
