//dummy data 제거 후 옵션 -> 필수로 변경 예정
export interface DestinationsType {
  id?: number; // 구 contentid
  category_id?: string; // 구 contenttypeid
  title: string;
  homepage?: string;
  tel?: string;
  image1?: string;
  image2?: string;
  addr1?: string;
  addr2?: string;
  zipcode?: string;
  mapx: number; //dummy data 제거 후 string으로 수정 예정 (API에서는 string)
  mapy: number; //dummy data 제거 후 string으로 수정 예정 (API에서는 string)
  overview?: string;
}

export type MapPropsType = Pick<DestinationsType, 'title' | 'mapx' | 'mapy'>;

export type MapWithWaypointsPropsType = Pick<
  DestinationsType,
  'title' | 'mapx' | 'mapy'
>;
