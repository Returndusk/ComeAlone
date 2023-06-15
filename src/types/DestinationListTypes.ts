export interface DestinationsType {
  id: number;
  category_id: number;
  title: string;
  homepage: string;
  tel: string;
  image1: string;
  image2: string;
  addr1: string;
  addr2: string;
  zipcode: string;
  mapx: string;
  mapy: string;
  overview: string;
  destination_comments: DestinationsReviewType[] | [];
  comment_count: number;
  destination_likes: DestinationsPreferenceType[] | [];
  destination_likes_count: number;
}

export interface specifiedCategoryDestinationsType extends DestinationsType {
  category_name: string;
}

export type DestinationInCommentType = Pick<
  DestinationsType,
  Exclude<
    keyof DestinationsType,
    | 'destination_comments'
    | 'comment_count'
    | 'destination_likes'
    | 'destination_likes_count'
  >
>;

export interface CountedCategoryItemsType {
  category_id: number;
  category_name: string;
  count: number;
}

export interface User {
  id: string;
  nickname: string;
  profile_image: string;
}

export interface CategoryListType {
  id: number;
  name: string;
}

export interface DestinationsReviewType {
  comment_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: User;
  destination: DestinationInCommentType;
}

export interface commentType {
  comment: string | null;
}

export interface DestinationsPreferenceType {
  destination_id: number;
  user_id: string;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
  user: User;
}

export type MapWithWaypointsPropsType = Pick<
  DestinationsType,
  'id' | 'title' | 'mapx' | 'mapy'
>;
