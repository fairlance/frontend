export class ProjectStatusValueConverter {
  toView(value) {

    let statusList: Array<any> = [
      {id: 'in_progress', name: 'Working'},
      {id: 'finalizing_terms', name: 'Finalizing Terms'},
      {id: 'pending_funds', name: 'Pending Funds'},
      {id: 'done', name: 'Done'},
      {id: 'pending_finished', name: 'Pending Finish Conformation'}
    ];
    let result = statusList.filter(item => item.id === value);
    if (result.length) {
      return statusList.filter(item => item.id === value)[0].name;
    }
    return 'Unknown'
  }
}