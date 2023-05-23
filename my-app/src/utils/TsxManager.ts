class TsxManager {
  static getEthFromWei(wei: number): number {
    return wei * 0.000000000000000001;
  }
}
export default TsxManager;
