export default {
  nfcId: (state) => state.NFC.nfcId,
  show_nfcId: (state) => state.statu.show_nfcId,
  cageStatu: (state) => state.statu.cageStatu,
  isNet: (state) => state.statu.isNet,
  loading: (state) => state.loading.loading,
  isShow: (state) => state.NFC.isShow,
  lay_time: (state) => state.lay.layTime.eggs,
  lastCageStatu: (state) => state.statu.lastCageStatu,
  showFor: (state) => state.flag.showFor,
  requests: (state) => state.reqCancel.requests,
  whipCount: (state) => state.proportion.whipCount,
  stayCount: (state) => state.proportion.stayCount,
  version: (state) => state.version.version,
  open: (state) => state.flag.open,
  operation: (state) => state.operation.operation,
  cageId: (state) => state.cageId.cageId,
  layTime: (state) => state.layEgg.layTime,
  egg_warn_list: (state) => state.eggWarning.egg_warn_list,
  total: (state) => state.eggWarning.total,
  isLoading: (state) => state.eggWarning.isLoading,
  token: (state) => state.login.token,
  editComplete: (state) => state.flag.editComplete,
};
