export type IKieuCa = { id: number; tenca: string; ghichu: string };

export type IKieuNgay = {
  id: number;
  tenloaingay: string;
  ghichu: string;
  ngaycuthe: null;
  ngaytrongtuan: string;
  cochuyencan: false;
};

export type IHeSo = {
  id: number;
  loaingay: string;
  loaica: string;
  batdau: string;
  ketthuc: string;
  heso: number;
};

export type IChuyenCan = {
  id: number;
  socongyeucau: number;
  tienchuyencan: number;
  nghi1ngay: number;
  nghi2ngay: number;
  nghi3ngay: number;
  created_at: string;
  updated_at: string;
  tuchamcong: number;
};

export type IBangLuong = {
  id: number;
  tenluong: string;
  tinhvaotangca: true;
  phaidilamdu: true;
  socongyeucau: number;
  luong: number;
  created_at: string;
  updated_at: string;
  tuchamcong: number;
};

export type WorkPageType = {
  id: number;
  tencongty: string;
  ngaybatdau: string;
  bophan: string;
  chucvu: string;
  hesos: IHeSo[];
  kieungays: IKieuNgay[];
  kieucas: IKieuCa[];
  chuyencan: IChuyenCan[];
  bangluong: IBangLuong[];
};

export type WorkDateType = {
  id: number;
  ngay: string;
  giovao: string;
  giora: string;
  ca: number;
  kieungay: number;
  kieunghi: number;
  ngaycham: string;
};
