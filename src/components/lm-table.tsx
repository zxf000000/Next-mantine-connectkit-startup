import styled from "@emotion/styled";
import {Table} from "@mantine/core";

const LmTable = styled(Table)`
  & thead {
    th {
      background-color: rgba(255,255,255,0.05);
      color: white !important;
    }
  }
`

export default LmTable;
