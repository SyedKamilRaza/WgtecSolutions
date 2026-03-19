import api from "../index";
import ENDPOINTS from "../endpoint";

const fetchProjectProgressByProposalId = async (proposalId) => {
  return api(
    `${ENDPOINTS.fetchProjectProgressByProposalId}/${proposalId}`,
    null,
    "get"
  );
};

export { fetchProjectProgressByProposalId };
