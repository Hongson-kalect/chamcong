export type WorkPageType = {
  id: number;
  tencongty: string;
  ngaybatdau: string;
  bophan: string;
  chucvu: string;
  hesos: {
    id: number;
    loaingay: string;
    loaica: string;
    batdau: string;
    ketthuc: string;
    heso: number;
  }[];
  kieungays: {
    id: number;
    tenloaingay: string;
    ghichu: string;
    ngaycuthe: null;
    ngaytrongtuan: string;
    cochuyencan: false;
  }[];
  kieucas: {
    id: number;
    tenca: string;
    ghichu: string;
  }[];
  chuyencan: {
    id: number;
    socongyeucau: number;
    tienchuyencan: number;
    nghi1ngay: number;
    nghi2ngay: number;
    nghi3ngay: number;
    created_at: string;
    updated_at: string;
    tuchamcong: number;
  }[];
  bangluong: {
    id: number;
    tenluong: string;
    tinhvaotangca: true;
    phaidilamdu: true;
    socongyeucau: number;
    luong: number;
    created_at: string;
    updated_at: string;
    tuchamcong: number;
  }[];
};
