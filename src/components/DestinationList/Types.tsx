export interface DestinationsType {
  title: string;
  mapx: number;
  mapy: number;
  addr1?: string;
  tel?: string;
  overview?: string;
  contenttypeid?: string;
  contentid?: string;
}

export type MapPropsType = Pick<DestinationsType, 'title' | 'mapx' | 'mapy'>;

export type MapWithWaypoinsPropsType = Pick<
  DestinationsType,
  'title' | 'mapx' | 'mapy'
>;
