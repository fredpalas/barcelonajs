import { ListCreator } from "../../../../../../src/Contexts/Todo/List/application/Create/ListCreator";
import { ListMother } from "../../Domain/ListMother";
import { ListCreatedDomainEvent } from "../../../../../../src/Contexts/Todo/List/domain/ListCreatedDomainEvent";
import EventBusMock from "../../../../Shared/domain/EventBusMock";
import { ListRepositoryMock } from "../../__mocks__/ListRepositoryMock";

let eventBus: EventBusMock;
let repository: ListRepositoryMock;
const FIXED_SYSTEM_TIME = '2020-11-18T00:00:00Z';
describe('ListCreator', () => {
  beforeEach(() => {
    eventBus = new EventBusMock();
    repository = new ListRepositoryMock();
    jest.useFakeTimers();
    jest.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it('creates a list', async () => {
    // Given
    const listCreator = new ListCreator(repository, eventBus);
    const list = ListMother.random();
    const event = new ListCreatedDomainEvent(
      {
        aggregateId: list.id.value,
        title: list.title.value,
        description: list.description.value,
        type: list.type.value,
        createdAt: list.createdAt,
        updatedAt: list.updatedAt,
      }
    );
    // When
    await listCreator.run(list);
    // Then
    repository.assertSaveHaveBeenCalledWith(list);
    eventBus.assertLastPublishedEventIs(event);
  });
})