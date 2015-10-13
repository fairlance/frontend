System.register([], function (_export) {
  'use strict';

  var Welcome, UpperValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      Welcome = (function () {
        function Welcome() {
          _classCallCheck(this, Welcome);

          this.heading = 'Welcome to the Tijuana!';
          this.firstName = 'John';
          this.lastName = 'Doe';
          this.previousValue = this.fullName;
        }

        _createClass(Welcome, [{
          key: 'submit',
          value: function submit() {
            this.previousValue = this.fullName;
            alert('Welcome, ' + this.fullName + '!');
          }
        }, {
          key: 'canDeactivate',
          value: function canDeactivate() {
            if (this.fullName !== this.previousValue) {
              return confirm('Are you sure you want to leave?');
            }
          }
        }, {
          key: 'fullName',
          get: function get() {
            return this.firstName + ' ' + this.lastName;
          }
        }]);

        return Welcome;
      })();

      _export('Welcome', Welcome);

      UpperValueConverter = (function () {
        function UpperValueConverter() {
          _classCallCheck(this, UpperValueConverter);
        }

        _createClass(UpperValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            return value && value.toUpperCase();
          }
        }]);

        return UpperValueConverter;
      })();

      _export('UpperValueConverter', UpperValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlbGNvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BRWEsT0FBTyxFQTJCUCxtQkFBbUI7Ozs7Ozs7OztBQTNCbkIsYUFBTztpQkFBUCxPQUFPO2dDQUFQLE9BQU87O2VBQ2xCLE9BQU8sR0FBRyx5QkFBeUI7ZUFDbkMsU0FBUyxHQUFHLE1BQU07ZUFDbEIsUUFBUSxHQUFHLEtBQUs7ZUFDaEIsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFROzs7cUJBSmxCLE9BQU87O2lCQWVaLGtCQUFFO0FBQ04sZ0JBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNuQyxpQkFBSyxlQUFhLElBQUksQ0FBQyxRQUFRLE9BQUksQ0FBQztXQUNyQzs7O2lCQUVZLHlCQUFHO0FBQ2QsZ0JBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ3hDLHFCQUFPLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2FBQ25EO1dBQ0Y7OztlQWJXLGVBQUU7QUFDWixtQkFBVSxJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxRQUFRLENBQUc7V0FDN0M7OztlQWJVLE9BQU87Ozs7O0FBMkJQLHlCQUFtQjtpQkFBbkIsbUJBQW1CO2dDQUFuQixtQkFBbUI7OztxQkFBbkIsbUJBQW1COztpQkFDeEIsZ0JBQUMsS0FBSyxFQUFDO0FBQ1gsbUJBQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUNyQzs7O2VBSFUsbUJBQW1CIiwiZmlsZSI6IndlbGNvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCB7Y29tcHV0ZWRGcm9tfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbmV4cG9ydCBjbGFzcyBXZWxjb21le1xuICBoZWFkaW5nID0gJ1dlbGNvbWUgdG8gdGhlIFRpanVhbmEhJztcbiAgZmlyc3ROYW1lID0gJ0pvaG4nO1xuICBsYXN0TmFtZSA9ICdEb2UnO1xuICBwcmV2aW91c1ZhbHVlID0gdGhpcy5mdWxsTmFtZTtcblxuICAvL0dldHRlcnMgY2FuJ3QgYmUgZGlyZWN0bHkgb2JzZXJ2ZWQsIHNvIHRoZXkgbXVzdCBiZSBkaXJ0eSBjaGVja2VkLlxuICAvL0hvd2V2ZXIsIGlmIHlvdSB0ZWxsIEF1cmVsaWEgdGhlIGRlcGVuZGVuY2llcywgaXQgbm8gbG9uZ2VyIG5lZWRzIHRvIGRpcnR5IGNoZWNrIHRoZSBwcm9wZXJ0eS5cbiAgLy9UbyBvcHRpbWl6ZSBieSBkZWNsYXJpbmcgdGhlIHByb3BlcnRpZXMgdGhhdCB0aGlzIGdldHRlciBpcyBjb21wdXRlZCBmcm9tLCB1bmNvbW1lbnQgdGhlIGxpbmUgYmVsb3dcbiAgLy9hcyB3ZWxsIGFzIHRoZSBjb3JycmVzcG9uZGluZyBpbXBvcnQgYWJvdmUuXG4gIC8vQGNvbXB1dGVkRnJvbSgnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJylcbiAgZ2V0IGZ1bGxOYW1lKCl7XG4gICAgcmV0dXJuIGAke3RoaXMuZmlyc3ROYW1lfSAke3RoaXMubGFzdE5hbWV9YDtcbiAgfVxuXG4gIHN1Ym1pdCgpe1xuICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHRoaXMuZnVsbE5hbWU7XG4gICAgYWxlcnQoYFdlbGNvbWUsICR7dGhpcy5mdWxsTmFtZX0hYCk7XG4gIH1cblxuICBjYW5EZWFjdGl2YXRlKCkge1xuICAgIGlmICh0aGlzLmZ1bGxOYW1lICE9PSB0aGlzLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgIHJldHVybiBjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gbGVhdmU/Jyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVcHBlclZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlKXtcbiAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUudG9VcHBlckNhc2UoKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
