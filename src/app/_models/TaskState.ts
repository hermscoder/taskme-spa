import {Injectable} from '@angular/core';

export enum TaskState {
    CREATED = 'CR',
    APPLICATIONS_OPEN = 'AO',
    APPLICATIONS_CLOSED = 'AC',
    STARTED = 'ST',
    DONE = 'DO',
    CANCELLED = 'CN'
}
