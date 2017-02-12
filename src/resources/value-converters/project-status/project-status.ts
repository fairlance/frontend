export class ProjectStatusValueConverter {
  toView(value) {
    let statusList: Array<any> = [
      {id: 'working', name: 'Working'},
      {id: 'finalizing_terms', name: 'Finalizing Terms'},
      {id: 'pending', name: 'Pending'},
      {id: 'archived', name: 'Archived'},
      {id: 'canceled', name: 'Canceled'}
    ];
    // debugger;
    let result = statusList.filter(item => item.id === value);
    if (result.length) {
      return statusList.filter(item => item.id === value)[0].name;
    }
    return 'Unknown'
  }
}