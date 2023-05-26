class ContractManager {
  static async getContract(contractName: string) {
    let contract = null;
    const res = await fetch(`contract_json/${contractName}.json`);

    if (res) {
      contract = await res.json();
    }
    return contract;
  }
}

export default ContractManager;
