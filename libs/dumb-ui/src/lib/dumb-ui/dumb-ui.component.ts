import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-dumb-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dumb-ui.component.html',
  styleUrls: ['./dumb-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DumbUiComponent {}
