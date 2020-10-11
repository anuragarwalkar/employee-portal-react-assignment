import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import { initialPagintaion } from '../../../utils/utils';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../../store/actions/employee';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

const CustomPagination = ({totalPages, history, onPageChanged, loading}: any) => {
  const classes = useStyles();

  const [pagination, setPagination] = useState(initialPagintaion);

  const updatePagination = (page: number) => {
    const newState = {
      ...pagination,
      skip: page 
    }

    setPagination(newState);
    onPageChanged(pagination.limit, page)
    history.push({
      pathname: '/',
      search: `limit=${pagination.limit}&skip=${page}`
    })
  }
  return (
    <div className={classes.root}>
      {!loading && <Pagination onChange={(event: any, page: number) => updatePagination(page)} count={totalPages} defaultPage={pagination.skip} color="primary" />}
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPageChanged: (limit: number, skip: number) => {
    dispatch(fetchEmployees(limit, skip))
  }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomPagination)) as any;
