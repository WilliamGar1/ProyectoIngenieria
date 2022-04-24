import { TestBed } from '@angular/core/testing';

import { NewChatService } from './new-chat.service';

describe('NewChatService', () => {
  let service: NewChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
