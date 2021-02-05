export interface Members {
  id: string;
  manage: boolean;
  name: string;
}

export interface Image {
  id: string;
  path: string;
}

export interface GroupState {
  groupIcon: Image;
  groupId: string;
  groupName: string;
  groupPassword: string;
  groupMembers: Members[];
}

export interface StoreState {
  groups: GroupState;
}

export interface ActionType {
  type: string;
  payload: GroupState;
}
