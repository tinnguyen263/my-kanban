import {call, put, select, all} from 'redux-saga/effects';
import {API} from '../../api/index';
import {Actions} from '../../actions/index';

function* computeNewProjectId(baseId) {
  let nTry = 0;
  let nextId = baseId;
  let hasId = yield call(API.project.hasId, nextId);
  while (hasId) {
    nextId = `${baseId}-${nTry}`;
    nTry++;
    hasId = yield call(API.project.hasId, nextId);
  }
  return nextId;
}

export function* createProjectAndCloseDialog(action) {
  let project = action.payload.project;
  try {
    project.id = yield call(computeNewProjectId, project.id);
    const currentUser = yield select((state) => state.auth.user);
    project.owner = currentUser.uid;

    // save to store
    yield put(Actions.project.saveProjectToState(project));

    // push to cloud
    yield put(Actions.project.pushOne(project.id));

    // close dialog
    yield put(Actions.app.hideDialog());
  } catch (e) {
    // show error message on dialog
    yield put(Actions.app.showToast(e.message));
  }
}

export function* cancelCreateProjectDialog() {
  try {
    yield put(Actions.app.hideDialog());
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}


// export function* createProject(project) {
//   try {
//     project.id = yield call(computeNewProjectId, project.id);
//     const currentUser = yield call(API.auth.getCurrentUser);
//     project.owner = currentUser.uid;
//     yield call(saveProject, project);
//   } catch (e) {
//     yield put(Actions.app.showToast(e.message));
//   }
// }
//
// export function* saveProject(project) {
//   try {
//     // save to firebase
//     project = yield call(API.project.saveOrUpdate, project);
//     // save to store
//     yield put(Actions.project.saveProjectToState(project));
//   } catch (e) {
//     yield put(Actions.app.showToast(e.message));
//   }
// }

export function* pushAll() {
  try {
    let projects = yield select((state) => state.userData.projects);
    yield all(Object.values(projects).map((project) => put(Actions.project.pushOne(project.id))));
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}

export function* pullAll() {
  try {
    let projects = yield call(API.project.getProjectsOfCurrentUser);
    yield all(Object.values(projects).map((project) => put(Actions.project.saveProjectToState(project))));
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}

export function* pushOne(action) {
  try {
    let projectId = action.payload.projectId;
    let project = yield select((state) => state.userData.projects[projectId]);
    yield call(API.project.saveProject, project);
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}

export function* pullOne(action) {
  try {
    let projectId = action.payload.projectId;
    let project = yield call(API.project.getSpecificProjectOfCurrentUser, projectId);
    yield put(Actions.project.saveProjectToState(project));
  } catch (e) {
    yield put(Actions.app.showToast(e.message));
  }
}