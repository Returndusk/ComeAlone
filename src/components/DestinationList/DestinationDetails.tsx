import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './DestinationDetails.module.scss';
import Review from './Review';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getAllCategoryList,
  getDestinationDetailsByDestinationId
} from '../../apis/destinationListAPI';
import AlertModal from '../common/Alert/AlertModal';
import {
  CategoryListType,
  specifiedCategoryDestinationsType
} from '../../types/DestinationListTypes';
import OpenModal from './Modal/OpenModal';
import UsersLike from './UsersLike';
import { useAuthState } from '../../contexts/AuthContext';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaCommentAlt, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import { createPortal } from 'react-dom';

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

function DestinationDetails() {
  const [destinationDetails, setDestinationDetails] =
    useState<specifiedCategoryDestinationsType | null>(null);
  const { authState } = useAuthState();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const { contentid } = useParams();
  const [isShowScheduleModal, setIsShowScheduleModal] =
    useState<boolean>(false);
  const [scheduleModalDomRoot, setScheduleModalDomRoot] =
    useState<HTMLElement | null>(null);
  const [categoryList, setCategoryList] = useState<CategoryListType[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const url = useLocation().pathname;
  const scrollRef = useRef<HTMLOptionElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleReviewIconClick = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setScheduleModalDomRoot(() => document.getElementById('main'));
  }, []);

  const getDestinationDetails = useCallback(async () => {
    setIsLoading(true);
    const res = await getDestinationDetailsByDestinationId(Number(contentid));
    const details = res?.data;
    setDestinationDetails(() => details);
    setIsLoading(false);
  }, [contentid]);

  useEffect(() => {
    getDestinationDetails();
  }, [getDestinationDetails]);

  const getAllCategoryData = useCallback(async () => {
    const res = await getAllCategoryList();
    const categoryListData = res?.data;
    setCategoryList(() => categoryListData);
    return;
  }, [setCategoryList]);

  useEffect(() => {
    getAllCategoryData();
  }, [getAllCategoryData]);

  //카테고리 id => name 변환 함수
  const changeCategoryIdIntoName = useCallback(
    (categoryId: number) => {
      const targetCategory = categoryList?.filter(
        (category) => category.id === categoryId
      );
      if (targetCategory) {
        return targetCategory[0].name ?? '기타';
      }
      return;
    },
    [categoryList]
  );

  // 목적지 리스트 상세정보의 홈페이지 부분 html 형식의 데이터 파싱
  const changeStringIntoHTML = (stringHTML: string, title: string) => {
    const removedBackslashString = stringHTML.replace(/\\/g, '');
    const hrefPattern = /href="([^"]*)"/;
    const hrefMatch = removedBackslashString.match(hrefPattern) ?? '';
    const hrefLink = hrefMatch[1];

    const targetPattern = /target="([^"]*)"/;
    const targetMatch = removedBackslashString.match(targetPattern) ?? '';
    const target = targetMatch[1];

    return (
      <a
        className={styles.destinationHomePage}
        href={hrefLink}
        target={target}
        title={title}
        rel='_ noreferrer'
      >
        {hrefLink}
      </a>
    );
  };

  const removeTagFromOverview = useCallback((overview: string) => {
    const removedStr = overview.replace(/<br>|<br\/>|<br \/>/g, '\n');
    return removedStr;
  }, []);

  const handleOnConfirm = () => {
    setIsShowAlert(false);
    navigate('/login', { state: { prevUrl: url } });
  };

  const handleShowModalClick = () => {
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    setIsShowScheduleModal(true);
    return;
  };

  return (
    <>
      {isLoading && (
        <div className={styles.destinationDetailsContainer}>
          <div className={styles.LoadingContainer}></div>
        </div>
      )}
      {destinationDetails !== null && !isLoading && (
        <div className={styles.destinationDetailsContainer} ref={detailsRef}>
          <section className={styles.destinationDetails}>
            <div className={styles.destinationDetailsImgContainer}>
              {destinationDetails.image1 && (
                <img
                  className={styles.destinationDetailsImage}
                  src={destinationDetails.image1}
                  alt={destinationDetails.title}
                />
              )}
              <span
                className={styles.categoryNameTag}
                id={styles[`Category-${destinationDetails?.category_id}`]}
              >
                {changeCategoryIdIntoName(destinationDetails?.category_id)}
              </span>
            </div>
            <h2 className={styles.destinationDetailsTitle}>
              {destinationDetails?.title}
            </h2>
            <div className={styles.destinationDetailsIcons}>
              <UsersLike destinationDetails={destinationDetails} />
              <div className={styles.destinationReviewContainer}>
                <button
                  className={styles.reviewButton}
                  onClick={handleReviewIconClick}
                >
                  <FaCommentAlt id={styles.destinationReviewIcon} />
                </button>
                <span id={styles.reviewLabel}>
                  {`리뷰ㆍ${destinationDetails?.comment_count}개`}
                </span>
              </div>
            </div>

            <div className={styles.destinationInfoContainer}>
              <span className={styles.destinationInfo}>
                <FaMapMarkerAlt id={styles.destinationAddrIcon} />
                <p className={styles.destinationAddress}>
                  {`${destinationDetails?.addr1} ${destinationDetails?.addr2}`}
                </p>
              </span>

              <span className={styles.destinationInfo}>
                <BsFillTelephoneFill id={styles.destinationTelIcon} />
                <p className={styles.destinationTelNumber}>
                  {destinationDetails?.tel
                    ? destinationDetails?.tel
                    : '제공된 정보 없음'}{' '}
                </p>
              </span>

              <span className={styles.destinationInfo}>
                <FaHome id={styles.destinationHomeIcon} />
                <p className={styles.hompageLinkContainer}>
                  {destinationDetails?.homepage
                    ? changeStringIntoHTML(
                        destinationDetails?.homepage,
                        destinationDetails?.title
                      )
                    : '제공된 정보 없음'}{' '}
                </p>
              </span>
            </div>

            <div className={styles.destinationOverview}>
              {removeTagFromOverview(destinationDetails?.overview)}
            </div>

            <div className={styles.scheduleModalButtonContainer}>
              <button
                className={styles.scheduleModalButton}
                onClick={handleShowModalClick}
              >
                내 일정에 추가
              </button>
            </div>
          </section>
          <section className={styles.detailsReviewsContainer} ref={scrollRef}>
            <Review />
          </section>
        </div>
      )}
      {isShowScheduleModal &&
        scheduleModalDomRoot !== null &&
        createPortal(
          <OpenModal closeModal={() => setIsShowScheduleModal(false)} />,
          scheduleModalDomRoot
        )}
      {isShowAlert && (
        <AlertModal
          message={ALERT_PROPS.message}
          onConfirm={handleOnConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </>
  );
}

export default DestinationDetails;
