import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Scrollbar from '../ScrollBar';
import { ACTIVE_STATUS, DELIVERY_STATUS } from '../../constants/Enums';
import SeverityPill from '../SeverityPill';
import { useNavigate } from 'react-router-dom';

const OrdersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const navigate = useNavigate();

  function limitString(str, maxLength) {
    if (str.length <= maxLength) {
      return str; // If the string is already shorter than the limit, return it as is
    }
    return str.substring(0, maxLength) + '...'; // Truncate and add "..."
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Order ID
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Customer's Name
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Product's Name
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Price
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Quantity
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Shop's Name
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Delivery Status
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Active Status
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell
                    colspan='12'
                    sx={{
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant='subtitle2'>
                      No Orders Found...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {items?.map((order) => {
                const isSelected = selected.includes(order.id);

                const createdDate = new Date(order.created_at);
                const createdAt = format(createdDate, 'yyyy-MM-dd');

                return (
                  <TableRow
                    onClick={() => navigate(`/portal/orders/view/${order.id}`)}
                    hover
                    sx={{ cursor: 'pointer' }}
                    key={order.id}
                    selected={isSelected}
                  >
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {order.order_id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {order.customer.first_name} {order.customer.last_name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {limitString(order.product.name, 50)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          ₱
                          {order.product.price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {order.quantity ?? 0} {order.quantity ? 'pcs' : 'pc'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {order.shop.name}
                    </TableCell>
                    <TableCell>
                      {order.status === 'Processing' && (
                        <SeverityPill color={DELIVERY_STATUS.processing}>
                          {order.status}
                        </SeverityPill>
                      )}

                      {order.status === 'Packed' && (
                        <SeverityPill color={DELIVERY_STATUS.packed}>
                          {order.status}
                        </SeverityPill>
                      )}

                      {order.status === 'Shipped' && (
                        <SeverityPill color={DELIVERY_STATUS.shipped}>
                          {order.status}
                        </SeverityPill>
                      )}

                      {order.status === 'Out For Delivery' && (
                        <SeverityPill color={DELIVERY_STATUS.delivery}>
                          {order.status}
                        </SeverityPill>
                      )}

                      {order.status === 'Delivered' && (
                        <SeverityPill color={DELIVERY_STATUS.delivered}>
                          {order.status}
                        </SeverityPill>
                      )}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={ACTIVE_STATUS[order.is_active]}>
                        {order.is_active ? 'Activated' : 'Deactivated'}
                      </SeverityPill>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {createdAt}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component='div'
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrdersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default OrdersTable;
