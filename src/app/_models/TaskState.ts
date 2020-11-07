import {Injectable} from '@angular/core';

export enum TaskState {
    CREATED = 10,
    APPLICATIONS_OPEN = 20,
    APPLICATIONS_CLOSED = 30,
    STARTED = 40,
    DONE = 50,
    CANCELLED = 0
}
