import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { faker } from '@faker-js/faker/locale/fa'
import { useContext, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination
} from '@mui/material';
import { faDate } from '../utils/formatTime';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar, UserModal } from '../sections/@dashboard/user';
// context
import { store } from '../store/Context';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstName', label: 'نام', alignRight: true },
  { id: 'lastName', label: 'نام خانوادگی', alignRight: true },
  { id: 'fatherName', label: 'نام پدر', alignRight: true },
  { id: 'birthday', label: 'تاریخ تولد', alignRight: true },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const { users, setUsers } = useContext(store);
  const USERLIST = users

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openNewUserModal, setOpenNewUserModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: { value: "", errorText: "لطفا نام خودتان را وارد کنید", error: false },
    lastName: { value: "", errorText: "لطفا نام خانوادگی را وارد کنید", error: false },
    fatherName: { value: "", errorText: "لطفا نام پدرتان را وارد کنید", error: false },
    birthday: new Date()
  });

  const handleOpenMenu = (event, id) => {
    setOpen({ anchorEl: event.currentTarget, id });
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((item) => item.id !== id))
    handleCloseMenu()
  }

  const handleCloseUserModal = () => {
    const newUserObject = {}
    Object.keys(newUser).forEach((label) => {
      if (label !== "birthday") {
        newUserObject[label] = { ...newUser[label], value: "", error: false }
      } else {
        newUserObject.birthday = new Date()
      }
    })
    setNewUser(newUserObject)
    setOpenNewUserModal(false)
    setOpenEditUserModal(false)
  }

  const handleAddUser = () => {
    let error = false
    Object.keys(newUser).forEach((label) => {
      if (label !== "birthday" && !newUser[label].value) {
        setNewUser({ ...newUser, [label]: { ...newUser[label], error: true } })
        error = true
      }
    })
    if (error) {
      return;
    }
    setUsers([...users, {
      id: faker.datatype.uuid(),
      avatarUrl: `/assets/images/avatars/avatar_${Math.floor(Math.random() * 24)}.jpg`,
      firstName: newUser.firstName.value,
      lastName: newUser.lastName.value,
      fatherName: newUser.fatherName.value,
      birthday: { data: newUser.birthday, faDate: faDate(newUser.birthday) }
    }])
    handleCloseUserModal()
  }

  const handleChangeUserInput = (e, label) => {
    const user = { ...newUser, [label]: { ...newUser[label], value: e.target.value } }
    if (user[label].value) {
      user[label].error = false
      setNewUser(user)
    } else {
      user[label].error = true
      setNewUser(user)
    }
  }

  const handleEditUserBtn = (id) => {
    const user = USERLIST.find((item) => item.id === id)
    setOpenEditUserModal(true)
    const editUserObject = {}
    Object.keys(newUser).forEach((label) => {
      if (label !== "birthday") {
        editUserObject[label] = { ...newUser[label], value: user[label] }
      } else {
        editUserObject.birthday = user.birthday.date
      }
    })
    setNewUser(editUserObject)
  }

  const handleEditUser = () => {
    let error = false
    Object.keys(newUser).forEach((label) => {
      if (label !== "birthday" && !newUser[label].value) {
        setNewUser({ ...newUser, [label]: { ...newUser[label], error: true } })
        error = true
      }
    })
    if (error) {
      return;
    }
    const prevUser = users.find((item) => item.id === open.id)
    setUsers(
      users.map((user) => {
        if (user.id === open.id) {
          return {
            id: prevUser.id,
            avatarUrl: prevUser.avatarUrl,
            firstName: newUser.firstName.value,
            lastName: newUser.lastName.value,
            fatherName: newUser.fatherName.value,
            birthday: { data: newUser.birthday, faDate: faDate(newUser.birthday) }
          }
        }
        return user
      }))
    handleCloseUserModal()
    handleCloseMenu()
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container sx={{ direction: "rtl" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            کاربران
          </Typography>
          <Button variant="contained" onClick={() => setOpenNewUserModal(true)}>
            <span>کاربر جدید</span>
            <Iconify icon="eva:plus-fill" sx={{ mr: "8px" }} />
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, firstName, lastName, fatherName, birthday, avatarUrl } = row;
                    const selectedUser = selected.indexOf(firstName) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, firstName)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center">
                            <Avatar alt={firstName} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap sx={{ mr: 2 }}>
                              {firstName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="right">{lastName}</TableCell>

                        <TableCell align="right">{fatherName}</TableCell>

                        <TableCell align="right">{birthday.faDate}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, id)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage='ردیف در هر صفحه :'
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open?.anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => handleEditUserBtn(open.id)}>
          <Iconify icon={'eva:edit-fill'} sx={{ ml: 2 }} />
          ویرایش
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDeleteUser(open.id)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ml: 2 }} />
          حذف
        </MenuItem>
      </Popover>

      <UserModal open={openNewUserModal} handleClose={handleCloseUserModal} handleAction={handleAddUser} title="افزودن کاربر" fields={newUser} setFields={setNewUser} handleChangeUserInput={handleChangeUserInput} />

      <UserModal open={openEditUserModal} handleClose={handleCloseUserModal} handleAction={handleEditUser} title="ویرایش کاربر" fields={newUser} setFields={setNewUser} handleChangeUserInput={handleChangeUserInput} />
    </>
  );
}
