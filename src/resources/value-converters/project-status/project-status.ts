export class ProjectStatusValueConverter {
  toView(value) {

    let statusList: Array<any> = [
      {id: 'working', name: 'Working'},
      {id: 'finalizing_terms', name: 'Finalizing Terms'},
      {id: 'pending', name: 'Pending'},
      {id: 'canceled', name: 'Canceled'}
    ];
    let result = statusList.filter(item => item.id === value);
    if (result.length) {
      return statusList.filter(item => item.id === value)[0].name;
    }
    return 'Unknown'
  }
}