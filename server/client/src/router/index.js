import React from 'react'
import { useRoutes } from 'react-router-dom';

import HomePage from '../pages/home'
import SignUp from '../pages/auth/Signup';
import Signin from '../pages/auth/Signin';

import AdminLayout from '../components/layout/AdminLayout'
import Admin from '../pages/adminpages/Admin'

import AddLayout from '../components/layout/AddLayout';
import EditLayout from '../components/layout/EditLayout';
import QuestionPart from '../components/admin/QuestionPart';

import UserLayout from '../components/layout/UserLayout';
import Content from '../components/users/common/Content';
import Exam from '../components/users/exam/Exam';
import Study from '../components/users/study/Study';

import Preview from '../pages/Preview';
import ExamResult from '../components/users/exam/Result';
import StudyResult from '../components/users/study/Result';

export default function Router() {
  const router = [
    {
      path: '/',
      element: <Signin />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { path: '', element: <Admin /> },
      ]
    },
    {
      path: '/add',
      element: <AddLayout />,
      children: [
        { path: '', element: <></> },
        { path: ':id', element: <QuestionPart /> },
      ]
    },
    {
      path: '/edit',
      element: <EditLayout />,
      children: [
        { path: '', element: <></> },
        { path: ':id', element: <QuestionPart /> },
      ]
    },
    {
      path: '/user',
      element: <UserLayout />,
      children: [
        { path: ':id', element: <Content /> },
      ]
    },
    {
      path: '/exam/:id',
      element: <Exam />
    }, 
    {
      path: '/study/:id',
      element: <Study />
    }, 
    {
      path: '/study/result',
      element: <StudyResult />
    },
    {
      path: '/exam/result',
      element: <ExamResult />
    },
    {
      path: '/preview',
      element: <Preview />
    }
  ];

  return useRoutes(router)
}